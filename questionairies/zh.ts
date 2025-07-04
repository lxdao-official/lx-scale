import { Questionnaire } from "@/types";
import { ocd } from "./ocd/zh";
import { scl90 } from "./scl90/zh";
import { sds } from "./sds/zh";
import { gad7 } from "./gad7/zh";
import { phq9 } from "./phq9/zh";
import { pss10 } from "./pss10/zh";

export const questionnairesZh: Questionnaire[] = [
    ocd,
    scl90,
    sds,
    gad7,
    phq9,
    pss10
];