import { Questionnaire } from "@/types";
import { ocd } from "./ocd/en";
import { scl90 } from "./scl90/en";
import { sds } from "./sds/en";
import { gad7 } from "./gad7/en";
import { phq9 } from "./phq9/en";
import { pss10 } from "./pss10/en";
import { dass21 } from "./dass21/en";
import { bdi2 } from "./bdi2/en";
import { isi } from "./isi/en";

export const questionnairesEn: Questionnaire[] = [
    ocd,
    scl90,
    sds,
    gad7,
    phq9,
    pss10,
    dass21,
    bdi2,
    isi
];