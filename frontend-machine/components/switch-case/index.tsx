'use client';

import React, {
  Children,
  ReactElement,
  ReactNode
} from "react";

/* ============================
   Types
============================ */

type SwitchValue = string;

type CaseValue =
  | string
  | ((value: SwitchValue) => boolean);

type SwitchProps = {
  value: SwitchValue;
  children: ReactNode;
};

type CaseProps = {
  value: CaseValue;
  children: ReactNode;
};

type DefaultCaseProps = {
  children: ReactNode;
};

/* ============================
   Components
============================ */

const CustomCase: React.FC<CaseProps> = ({ children }) => {
  return <>{children}</>;
};

const DefaultCase: React.FC<DefaultCaseProps> = ({ children }) => {
  return <>{children}</>;
};

const CustomSwitch: React.FC<SwitchProps> = ({ children, value }) => {
  let matchedCases: ReactElement[] = [];
  let defaultCase: ReactElement | null = null;

  Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    /* ---- Handle CustomCase ---- */
    if (child.type === CustomCase) {
      const caseElement = child as ReactElement<CaseProps>;
      const caseValue = caseElement.props.value;

      // Exact string match
      if (typeof caseValue === "string" && caseValue === value) {
        matchedCases.push(caseElement);
      }

      // Predicate match
      if (typeof caseValue === "function" && caseValue(value)) {
        matchedCases.push(caseElement);
      }
    }

    /* ---- Handle DefaultCase ---- */
    if (child.type === DefaultCase) {
      defaultCase = child;
    }
  });

  if (matchedCases.length > 0) {
    return <>{matchedCases}</>;
  }

  return defaultCase;
};

/* ============================
   Usage Example
============================ */

const Index = () => {
  return (
    <div>
      <h2>Custom Switch Demo</h2>

      <CustomSwitch value="20">

        {/* Exact match */}
        <CustomCase value="10">
          <div>Exact 10</div>
        </CustomCase>

        {/* Predicate match */}
        <CustomCase value={(v) => Number(v) > 15}>
          <div>Greater than 15</div>
        </CustomCase>

        {/* Another predicate */}
        <CustomCase value={(v) => Number(v) % 2 === 0}>
          <div>Even number</div>
        </CustomCase>

        <DefaultCase>
          <div>Default Case</div>
        </DefaultCase>

      </CustomSwitch>
    </div>
  );
};

export default Index;
