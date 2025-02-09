import styled from 'styled-components';
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Typography from '@/styles/Typography';
import { View } from 'react-calendar/dist/esm/shared/types.js';

interface DurationContentProps {
  currentDate: [Date, Date] | null;
  onDurationSelected?: (startDate: Date, endDate: Date) => void;
}

export const DurationContent = ({
  currentDate,
  onDurationSelected = () => {},
}: DurationContentProps) => {
  const today = new Date();
  const nextDay = new Date();
  nextDay.setDate(today.getDate() + 1);
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7);

  const [value, setValue] = useState<[Date, Date]>(currentDate || [nextDay, sevenDaysLater]);

  const handleComplete = () => {
    if (value) {
      const [startDate, endDate] = value;
      onDurationSelected(startDate, endDate);
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <TitleText variant="heading1">기간을 선택해주세요.</TitleText>
        <CompleteText variant="heading3" onClick={handleComplete}>
          완료
        </CompleteText>
      </HeaderContainer>
      <CalendarWrapper>
        <StyledCalendar
          onChange={(val) => setValue(val as [Date, Date])}
          value={value}
          selectRange={true}
          minDate={new Date()}
          showNeighboringMonth={false}
          formatMonthYear={(locale, date) =>
            `${date.toLocaleString(locale, { month: 'long' })} ${date.getFullYear()}`
          }
          formatDay={(_, date) => formatCalendarDay(date)}
          tileClassName={({ date, view }) => getTileClassName(date, view, value)}
        />
      </CalendarWrapper>
    </Container>
  );
};

const formatCalendarDay = (date: Date): string => {
  const day = date.getDate();
  return `${day}`;
};

const getTileClassName = (date: Date, view: View, range: [Date, Date]) => {
  if (view !== 'month' || !range) return '';
  const [start, end] = range;
  if (date >= start && date <= end) {
    if (date.toDateString() === start.toDateString()) return 'range-start';
    if (date.toDateString() === end.toDateString()) return 'range-end';
    return 'in-range';
  }
  return '';
};

export default DurationContent;

const Container = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TitleText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale100};
`;

const CompleteText = styled(Typography)`
  color: ${(props) => props.theme.colors.sementicMain};
  cursor: pointer;
`;

const CalendarWrapper = styled.div`
  .react-calendar {
    border: none;
  }

  .react-calendar__navigation__prev2-button {
    display: none;
  }

  .react-calendar__navigation__next2-button {
    display: none;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    font-weight: bold;
  }

  .react-calendar__navigation__arrow {
    background-color: transparent;
    color: #000000;
  }

  .react-calendar__navigation__arrow:enabled:hover {
    background-color: transparent;
    color: #000000;
  }

  .react-calendar__navigation__arrow:disabled {
    color: #707070;
  }
  .react-calendar__navigation button:disabled {
    background-color: transparent;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-size: 12px;
    color: #707070;
  }

  .react-calendar__month-view__days__day--weekend {
    text-align: center;
    font-size: 12px;
    color: #000000;
  }

  .react-calendar__tile {
    font-size: 16px;
    font-weight: 500;
    height: 38px;
    width: 38px;
  }

  .react-calendar__tile:disabled {
    background-color: transparent;
  }

  .react-calendar__tile--now {
    background: none;
    color: #000000;
  }

  .react-calendar__tile--disabled {
    color: #ccc !important;
    background-color: none !important;
  }

  .react-calendar__tile.range-start {
    background: #1f87ff;
    color: white;
    border-radius: 16px 0 0 16px;
  }

  .react-calendar__tile--rangeStart {
    background: #1f87ff;
    color: white;
    border-radius: 16px 0 0 16px;
  }

  .react-calendar__tile.range-end {
    background: #1f87ff;
    color: white;
    border-radius: 0 16px 16px 0;
  }

  .react-calendar__tile.in-range {
    background: #e8f3ff;
    color: #222222;
  }
`;

const StyledCalendar = styled(Calendar)``;
