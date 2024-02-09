import { Observable } from "rxjs";
import { Reasoning } from "./node.interface";

export interface ReasonCreatorInterface {
    provideReasoning(data: Reasoning): Observable<Reasoning>;
}