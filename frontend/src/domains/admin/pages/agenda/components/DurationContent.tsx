import { CategoryIcon } from '@/components/CategoryIcon';
import Typography from '@/styles/Typography';
import { ChatCategoryType } from '@/types/ChatCategoryType';
import styled from 'styled-components';
import { useState } from 'react';

import Calendar from 'react-calendar';

interface DurationContentProps {
  onDurationSelected?: (type: ChatCategoryType) => void;
}

export const DurationContent = ({ onDurationSelected = () => {} }: DurationContentProps) => {
  //   const [state, setState] = useState([
  //     {
  //       startDate: new Date(),
  //       endDate: addDays(new Date(), 1),
  //       key: 'selection',
  //     },
  //   ]);

  return (
    <Container>
      <Calendar
        // onChange={changeDate}
        // formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
        selectRange={true}
        // nextLabel={<NextIcon />}
        // prevLabel={<PrevIcon />}
        // next2Label={null}
        // prev2Label={null}
        // showNeighboringMonth={false}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
