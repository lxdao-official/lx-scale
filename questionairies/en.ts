import { Questionnaire } from "@/types";
import { ocd } from "./ocd/en";
import { scl90 } from "./scl90/en";
import { sds } from "./sds/en";
import { gad7 } from "./gad7/en";
import { phq9 } from "./phq9/en";
import { pss10 } from "./pss10/en";

export const questionnairesEn: Questionnaire[] = [
    ocd,
    scl90,
    sds,
    gad7,
    phq9,
    pss10
];