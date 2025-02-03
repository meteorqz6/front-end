import useBrideGroomStore from '@/store/useBrideGroomStore';
import FamilyName from './FamilyName';
import Greeting from './Greeting';

const GreetingSection = () => {
  const brideGroom = useBrideGroomStore((state) => state.brideGroom);

  const allNamesFilled = brideGroom.every(
    (person) =>
      person.name.trim() !== '' &&
      person.family.father.name.trim() !== '' &&
      person.family.mother.name.trim() !== '',
  );

  return (
    <div className="column-center gap-20 py-14">
      <Greeting />
      {allNamesFilled && <FamilyName />}
    </div>
  );
};

export default GreetingSection;
