// Copyright (C) 2023 Light, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import type { FC } from "react";
import { RootContext } from "@/app/(authenticated)/new/(components)/root/root-context";
import { RootLink } from "@/app/(authenticated)/new/(components)/root/root-link";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export enum StepsEnum {
  // eslint-disable-next-line no-unused-vars
  New = "new",
  // eslint-disable-next-line no-unused-vars
  Configuration = "configuration",
  // eslint-disable-next-line no-unused-vars
  Confirm = "confirm",
}

export interface Step {
  enum: StepsEnum;
  id: string;
  name: string;
  href: string;
}

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export const steps: Step[] = [
  {
    enum: StepsEnum.New,
    id: "01",
    name: "Wallet Name",
    href: "/new",
  },
  {
    enum: StepsEnum.Configuration,
    id: "02",
    name: "Wallet Configuration",
    href: "/new/configuration",
  },
  {
    enum: StepsEnum.Confirm,
    id: "03",
    name: "Confirm",
    href: "/new/confirm",
  },
];

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface NewRootProps {
  children: React.ReactNode;
  currentStepType: StepsEnum;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const NewRoot: FC<NewRootProps> = async ({
  currentStepType,
  children,
}) => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <div className="w-full flex-1 space-y-6">
        <nav aria-label="Progress">
          <ol className="divide-y divide-border overflow-hidden rounded-md border border-border bg-background-weak md:flex md:divide-y-0">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="relative md:flex md:flex-1">
                <RootLink
                  currentStepType={currentStepType}
                  stepType={step.enum}
                />
                {stepIdx !== steps.length - 1 ? (
                  <>
                    <div
                      className="absolute right-0 top-0 hidden h-full w-5 md:block"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-full w-full text-border"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mx-auto flex h-full flex-col">{children}</div>
      </div>
      <aside className="hidden w-96 lg:block">
        <RootContext />
      </aside>
    </div>
  );
};
