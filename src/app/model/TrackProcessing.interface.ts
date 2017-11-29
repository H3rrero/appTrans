import { Track } from "./impl/Track.model";

export interface TrackProcessing {
   
    from(text:string):Track;
    to(track:Track):string;
}