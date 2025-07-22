import { Category, Option } from "../types/types";
import { ChoiceComponent } from "./Choice";

import "../pages/home.css";

type OptionsProp = {
  options: Category[];
  initEditing: (cat: string, opt: Option) => void;
};
export const OptionsComponent = ({ options, initEditing }: OptionsProp) => {
  return (
    <div className="options-wrapper">
      <h2>Options</h2>
      {options.map((o) => (
        <div key={o.name}>
          <h3>{o.name}</h3>
          <div className="options-grid">
            {o.choices.map((c, i) => (
              <ChoiceComponent
                key={`${i}-${c.name}`}
                choice={c}
                category={o.name}
                initEditing={initEditing}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
