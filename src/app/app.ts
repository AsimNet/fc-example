import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils.js';
// snapdom will be imported dynamically

interface Course {
  code: string;
  name: string;
  color: string;
  expanded?: boolean;
  sections?: Section[];
}

interface Section {
  sectionNumber: string;
  type: string;
  instructor: string;
  selected?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  calendarVisible = signal(true);
  courses: Course[] = [
    {
      code: 'حاسب 101',
      name: 'مقدمة في علوم الحاسب',
      color: '#3B82F6',
      expanded: false,
      sections: [
        { sectionNumber: '001', type: 'محاضرة', instructor: 'د. سارة الأحمد', selected: false },
        { sectionNumber: '002', type: 'معمل', instructor: 'د. سارة الأحمد', selected: false },
        { sectionNumber: '003', type: 'محاضرة', instructor: 'د. أحمد الشمري', selected: false },
      ]
    },
    {
      code: 'ريض 201',
      name: 'التفاضل والتكامل 2',
      color: '#8B5CF6',
      expanded: false,
      sections: [
        { sectionNumber: '001', type: 'محاضرة', instructor: 'أ.د. محمد العمري', selected: false },
        { sectionNumber: '002', type: 'تمارين', instructor: 'أ.د. محمد العمري', selected: false },
      ]
    },
    {
      code: 'فيز 101',
      name: 'معمل الفيزياء',
      color: '#10B981',
      expanded: false,
      sections: [
        { sectionNumber: '001', type: 'معمل', instructor: 'د. فاطمة الزهراني', selected: false },
        { sectionNumber: '002', type: 'معمل', instructor: 'د. فاطمة الزهراني', selected: false },
      ]
    },
    {
      code: 'نجل 201',
      name: 'الأدب الإنجليزي',
      color: '#EF4444',
      expanded: false,
      sections: [
        { sectionNumber: '001', type: 'محاضرة', instructor: 'أ. مريم القحطاني', selected: false },
        { sectionNumber: '002', type: 'نقاش', instructor: 'أ. مريم القحطاني', selected: false },
      ]
    }
  ];

  selectedSectionsCount = 0;

  calendarOptions = signal<CalendarOptions>({
    plugins: [timeGridPlugin, interactionPlugin, dayGridPlugin, listPlugin],
    initialView: 'timeGridWeek',
    direction:'rtl',
    firstDay: 0, // Sunday - like the original
    headerToolbar: {left: '', center: 'title', right: ''},
    titleFormat: () => 'الجدول الأسبوعي',
    slotLabelInterval: '01:00:00',
    slotLabelFormat: {hour: '2-digit', minute: '2-digit', hour12: false},
    dayHeaderFormat: {weekday: 'long'},
    allDaySlot: false,
    nowIndicator: false,
    editable: false,
    selectable: false,
    selectMirror: false,
    eventOverlap: true,
    eventDisplay: 'block',
    slotMinTime: '08:00:00',
    slotMaxTime: '16:00:00',
    locale: 'ar',
    eventTimeFormat: {hour: '2-digit', minute: '2-digit', hour12: false},
    events: INITIAL_EVENTS,
    eventOrder: 'order', // Newer events (higher order) appear on top
    eventContent: (arg) => {
      const event = arg.event;
      const instructor = event.extendedProps['instructor'] || '';
      const location = event.extendedProps['location'] || '';
      const backgroundColor = event.backgroundColor || '#3B82F6';

      // Calculate text color based on background
      const textColor = '#FFFFFF';

      const html = `
        <div class="fc-event-main-frame" style="background-color: ${backgroundColor}; padding: 4px; height: 100%; overflow: hidden;">
          <div class="font-semibold" style="color: ${textColor}; font-size: 13px;">${event.title}</div>
          <div class="text-xs font-normal opacity-90 mt-1 whitespace-nowrap overflow-x-auto scrollbar-thin" style="font-size: 10px; color: ${textColor};">${instructor}</div>
          <div class="text-xs opacity-75" style="color: ${textColor}; font-size: 10px;">${location}</div>
        </div>
      `;

      return { html };
    }
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  toggleCourse(course: Course) {
    course.expanded = !course.expanded;
  }

  toggleSection(section: Section) {
    section.selected = !section.selected;
    this.updateSelectedSectionsCount();
  }

  clearAllSections() {
    this.courses.forEach(course => {
      if (course.sections) {
        course.sections.forEach(section => {
          section.selected = false;
        });
      }
    });
    this.updateSelectedSectionsCount();
  }

  private updateSelectedSectionsCount() {
    let count = 0;
    this.courses.forEach(course => {
      if (course.sections) {
        count += course.sections.filter(s => s.selected).length;
      }
    });
    this.selectedSectionsCount = count;
  }

  async exportToJPG() {
    try {
      const calendarElement = document.getElementById('calendar-export-target');
      if (calendarElement) {
        // Dynamically import snapdom
        const snapdom = await import('@zumer/snapdom');

        // Use reusable capture approach
        const result = await snapdom.snapdom(calendarElement, {
          scale: 2,
          backgroundColor: '#ffffff'
        });

        // Download as JPG
        await result.download({
          format: 'jpg',
          filename: `timetable-${new Date().toISOString().split('T')[0]}`
        });
      }
    } catch (error) {
      console.error('Error exporting calendar:', error);
      alert('حدث خطأ أثناء تصدير الجدول');
    }
  }
}
