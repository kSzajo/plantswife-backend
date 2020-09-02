import { ProcessInterval } from './processInterval.enum';

export class PlantDto {
  name: string;
  notes: string;
  place: string;
  watering: PlantProcess;
  spraing: PlantProcess;
  feeding: PlantProcess;
}

export class PlantProcess {
  interval: ProcessInterval;
  lastTimeProcessed: Date;
  nextTimeProcessed: Date;
}



