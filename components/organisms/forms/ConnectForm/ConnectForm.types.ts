import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface ConnectFormProps<T extends FieldValues> {
  children(methods: UseFormReturn<T, any, T>): React.ReactNode;
}
