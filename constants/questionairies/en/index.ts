import { Questionnaire } from "../type";
import { depression } from "./depression";
import { scl90 } from "./scl90";
import { ocd } from "./ocd";

export const questionnairesEn: Questionnaire[] = [
    scl90,
    depression,
    ocd
];