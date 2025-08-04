import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

const getWeekDayStr = (daysFromToday: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return date.toISOString().replace(/T.*$/, '');
};

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'مقدمة في علوم الحاسب',
    start: getWeekDayStr(0) + 'T09:00:00',
    end: getWeekDayStr(0) + 'T10:30:00',
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
    extendedProps: {
      instructor: 'د. سارة الأحمد',
      location: 'قاعة 101، مبنى أ'
    }
  },
  {
    id: createEventId(),
    title: 'التفاضل والتكامل 2',
    start: getWeekDayStr(0) + 'T11:00:00',
    end: getWeekDayStr(0) + 'T12:30:00',
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
    extendedProps: {
      instructor: 'أ.د. محمد العمري',
      location: 'قاعة المحاضرات 2'
    }
  },
  {
    id: createEventId(),
    title: 'معمل الفيزياء',
    start: getWeekDayStr(0) + 'T14:00:00',
    end: getWeekDayStr(0) + 'T16:00:00',
    backgroundColor: '#10B981',
    borderColor: '#10B981',
    extendedProps: {
      instructor: 'د. فاطمة الزهراني',
      location: 'معمل الفيزياء 3ب'
    }
  },
  {
    id: createEventId(),
    title: 'هياكل البيانات والخوارزميات',
    start: getWeekDayStr(1) + 'T09:30:00',
    end: getWeekDayStr(1) + 'T11:00:00',
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
    extendedProps: {
      instructor: 'د. أحمد الشمري',
      location: 'معمل الحاسب 205'
    }
  },
  {
    id: createEventId(),
    title: 'الأدب الإنجليزي',
    start: getWeekDayStr(1) + 'T13:00:00',
    end: getWeekDayStr(1) + 'T14:30:00',
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
    extendedProps: {
      instructor: 'أ. مريم القحطاني',
      location: 'مبنى العلوم الإنسانية، قاعة 302'
    }
  },
  {
    id: createEventId(),
    title: 'الكيمياء العضوية',
    start: getWeekDayStr(2) + 'T08:00:00',
    end: getWeekDayStr(2) + 'T09:30:00',
    backgroundColor: '#06B6D4',
    borderColor: '#06B6D4',
    extendedProps: {
      instructor: 'د. عبدالله الغامدي',
      location: 'معمل الكيمياء 1أ'
    }
  },
  {
    id: createEventId(),
    title: 'مقدمة في علوم الحاسب',
    start: getWeekDayStr(2) + 'T10:00:00',
    end: getWeekDayStr(2) + 'T11:30:00',
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
    extendedProps: {
      instructor: 'د. سارة الأحمد',
      location: 'قاعة 101، مبنى أ'
    }
  },
  {
    id: createEventId(),
    title: 'الإحصاء',
    start: getWeekDayStr(2) + 'T14:00:00',
    end: getWeekDayStr(2) + 'T15:30:00',
    backgroundColor: '#EC4899',
    borderColor: '#EC4899',
    extendedProps: {
      instructor: 'أ. نورة السعيد',
      location: 'مبنى الرياضيات، قاعة 210'
    }
  },
  {
    id: createEventId(),
    title: 'التاريخ العالمي',
    start: getWeekDayStr(3) + 'T09:00:00',
    end: getWeekDayStr(3) + 'T10:30:00',
    backgroundColor: '#84CC16',
    borderColor: '#84CC16',
    extendedProps: {
      instructor: 'د. خالد المطيري',
      location: 'قسم التاريخ، قاعة أ'
    }
  },
  {
    id: createEventId(),
    title: 'التفاضل والتكامل 2',
    start: getWeekDayStr(3) + 'T11:00:00',
    end: getWeekDayStr(3) + 'T12:30:00',
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
    extendedProps: {
      instructor: 'أ.د. محمد العمري',
      location: 'قاعة المحاضرات 2'
    }
  },
  {
    id: createEventId(),
    title: 'علم النفس 101',
    start: getWeekDayStr(3) + 'T15:00:00',
    end: getWeekDayStr(3) + 'T16:30:00',
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
    extendedProps: {
      instructor: 'د. هند الدوسري',
      location: 'مبنى العلوم الاجتماعية، قاعة 115'
    }
  },
  {
    id: createEventId(),
    title: 'هياكل البيانات والخوارزميات',
    start: getWeekDayStr(4) + 'T09:30:00',
    end: getWeekDayStr(4) + 'T11:00:00',
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
    extendedProps: {
      instructor: 'د. أحمد الشمري',
      location: 'معمل الحاسب 205'
    }
  },
  {
    id: createEventId(),
    title: 'معمل الفيزياء',
    start: getWeekDayStr(4) + 'T14:00:00',
    end: getWeekDayStr(4) + 'T16:00:00',
    backgroundColor: '#10B981',
    borderColor: '#10B981',
    extendedProps: {
      instructor: 'د. فاطمة الزهراني',
      location: 'معمل الفيزياء 3ب'
    }
  },
  {
    id: createEventId(),
    title: 'مجموعة دراسية - التفاضل والتكامل',
    start: getWeekDayStr(5) + 'T10:00:00',
    end: getWeekDayStr(5) + 'T12:00:00',
    backgroundColor: '#94A3B8',
    borderColor: '#94A3B8',
    extendedProps: {
      instructor: 'بقيادة الطلاب',
      location: 'قاعة الدراسة 4، المكتبة'
    }
  },
  {
    id: createEventId(),
    title: 'ورشة البرمجة',
    start: getWeekDayStr(6) + 'T13:00:00',
    end: getWeekDayStr(6) + 'T15:00:00',
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
    extendedProps: {
      instructor: 'نادي التقنية',
      location: 'معمل الابتكار'
    }
  }
];

export function createEventId() {
  return String(eventGuid++);
}
