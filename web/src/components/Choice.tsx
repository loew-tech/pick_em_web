import { Option } from "../types/types";

type ChoiceProps = {
  key: string;
  choice: Option;
};
export const ChoiceComponent = ({ key, choice }: ChoiceProps) => {
  return (
    <div className="option-card" key={key}>
      <h4>{choice.name}</h4>
      <ul>
        <li>Interest: {choice.interest ?? "?"}</li>
        <li>Effort: {choice.effort ?? "?"}</li>
      </ul>
    </div>
  );
};
