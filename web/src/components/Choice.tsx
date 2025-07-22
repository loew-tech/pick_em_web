import { Option } from "../types/types";

type ChoiceProps = {
  key: string;
  choice: Option;
  category: string;
  initEditing: (cat: string, opt: Option) => void;
};
export const ChoiceComponent = ({
  key,
  choice,
  category,
  initEditing,
}: ChoiceProps) => {
  return (
    <div
      className="option-card"
      key={key}
      onClick={() => initEditing(category, choice)}
    >
      <h4>{choice.name}</h4>
      <ul>
        <li>Interest: {choice.interest ?? "?"}</li>
        <li>Effort: {choice.effort ?? "?"}</li>
      </ul>
    </div>
  );
};
