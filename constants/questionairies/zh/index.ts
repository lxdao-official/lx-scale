import { Questionnaire } from "../type";
import { depression } from "./depression";
import { scl90 } from "./scl90";
import { ocd } from "./ocd";

export const questionnairesZh: Questionnaire[] = [
    scl90,
    depression,
    ocd
];