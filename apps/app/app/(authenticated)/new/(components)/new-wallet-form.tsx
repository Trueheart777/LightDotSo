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

"use client";

import { NOTION_LINKS } from "@lightdotso/const";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  RadioGroup,
  RadioGroupItem,
  Input,
  Label,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@lightdotso/ui";
import {
  BanknotesIcon,
  BuildingLibraryIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { steps } from "@/app/(authenticated)/new/(components)/root/root";
import {
  useInviteCodeQueryState,
  useNameQueryState,
  useTypeQueryState,
} from "@/app/(authenticated)/new/(hooks)";
import type { WalletType } from "@/app/(authenticated)/new/(hooks)";
import { newFormSchema } from "@/schemas/newForm";
import { useNewForm } from "@/stores";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type NewFormValues = z.infer<typeof newFormSchema>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const NewWalletForm: FC = () => {
  // ---------------------------------------------------------------------------
  // Next Hooks
  // ---------------------------------------------------------------------------

  const router = useRouter();

  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { setFormValues } = useNewForm();

  // ---------------------------------------------------------------------------
  // Query State Hooks
  // ---------------------------------------------------------------------------

  const [name, setName] = useNameQueryState();
  const [inviteCode, setInviteCode] = useInviteCodeQueryState();
  const [type, setType] = useTypeQueryState();

  // ---------------------------------------------------------------------------
  // Form
  // ---------------------------------------------------------------------------

  const defaultValues: Partial<NewFormValues> = {
    name,
    type,
    inviteCode,
  };

  const form = useForm<NewFormValues>({
    resolver: zodResolver(newFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      setFormValues(value);
      if (name === "name") {
        if (value.name === undefined || value.name === "") {
          setName(null);
        } else {
          setName(value.name);
        }
      }
      if (name === "inviteCode") {
        if (value.inviteCode === undefined || value.inviteCode === "") {
          setInviteCode(null);
        } else {
          setInviteCode(value.inviteCode);
        }
      }
      if (name === "type") {
        if (value.type === "multi" || value.type === undefined) {
          setType(null);
        } else {
          setType(value.type as WalletType);
        }
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch]);

  // Set the form values from the URL on mount
  useEffect(() => {
    // Set the form values from the default values
    setFormValues(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------------------------------------------------------
  // Callback Hooks
  // ---------------------------------------------------------------------------

  const navigateToStep = useCallback(() => {
    const url = new URL(steps[1].href, window.location.origin);
    url.searchParams.set("name", name);
    url.searchParams.set("inviteCode", inviteCode);
    url.searchParams.set("type", type);
    router.push(url.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, inviteCode, type]);

  const onSubmit = useCallback(
    (_data: NewFormValues) => {
      navigateToStep();
    },
    [navigateToStep],
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Card className="flex flex-col space-y-6 px-2 py-4 lg:px-6 lg:pt-6">
      <CardHeader className="gap-3 p-0">
        <CardTitle>Create a New Wallet</CardTitle>
        <CardDescription>Select a name for your new wallet.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-10 p-0">
        <TooltipProvider delayDuration={300}>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <div className="grid gap-3">
                    <FormLabel htmlFor="type">Type</FormLabel>
                    <RadioGroup
                      defaultValue={field.value}
                      id="type"
                      className="grid grid-cols-3 gap-4"
                      onValueChange={field.onChange}
                    >
                      <div>
                        <Tooltip>
                          <RadioGroupItem
                            value="multi"
                            id="multi"
                            className="peer sr-only"
                          />
                          <TooltipTrigger asChild>
                            <Label
                              htmlFor="multi"
                              className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-border bg-background-body p-4 hover:bg-background-stronger hover:text-text-weak peer-data-[state=checked]:border-border-primary [&:has([data-state=checked])]:border-border-primary"
                            >
                              <BuildingLibraryIcon className="mb-3 h-6 w-6" />
                              Multi-sig
                            </Label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              A standard multi-sig wallet that requires multiple
                              signers.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip>
                          <RadioGroupItem
                            value="personal"
                            id="personal"
                            className="peer sr-only"
                          />
                          <TooltipTrigger asChild>
                            <Label
                              htmlFor="personal"
                              className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-border bg-background-body p-4 hover:bg-background-stronger hover:text-text-weak peer-data-[state=checked]:border-border-primary [&:has([data-state=checked])]:border-border-primary"
                            >
                              <BanknotesIcon className="mb-3 h-6 w-6" />
                              Personal Vault
                            </Label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Protect your personal assets using backup key
                              signers.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip>
                          <RadioGroupItem
                            disabled
                            value="2fa"
                            id="2fa"
                            className="peer sr-only"
                          />
                          <TooltipTrigger asChild>
                            <Label
                              htmlFor="2fa"
                              className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-border bg-background-body p-4 hover:bg-background-stronger hover:text-text-weak peer-data-[state=checked]:border-border-primary [&:has([data-state=checked])]:border-border-primary"
                            >
                              <ShieldExclamationIcon className="mb-3 h-6 w-6" />
                              2FA (Coming Soon)
                            </Label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Coming soon ...</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </RadioGroup>
                    <CardDescription className="text-sm">
                      Select the type of wallet you want to create
                    </CardDescription>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <div className="grid gap-3">
                      <Input
                        id="name"
                        placeholder="Your Wallet Name"
                        defaultValue={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                    <FormDescription>
                      Enter a name for your new wallet
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inviteCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="inviteCode">Invite Code</FormLabel>
                    <div className="grid gap-3">
                      <Input
                        id="inviteCode"
                        placeholder="Your Invite Code"
                        defaultValue={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                    <FormDescription>Enter the invite code</FormDescription>
                  </FormItem>
                )}
              />
              <div>
                <CardDescription className="text-base text-text">
                  By creating a new wallet, you are accepting our{" "}
                  <a
                    className="underline"
                    href={NOTION_LINKS["Terms of Service"]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    term and conditions
                  </a>
                </CardDescription>
              </div>
              <CardFooter className="justify-end p-0">
                <Button
                  disabled={!form.formState.isValid}
                  variant={form.formState.isValid ? "default" : "outline"}
                  type="submit"
                  onClick={() => navigateToStep()}
                >
                  Continue
                </Button>
              </CardFooter>
            </form>
          </Form>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};
