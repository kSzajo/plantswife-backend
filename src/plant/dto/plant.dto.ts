import { ProcessInterval } from './processInterval.enum';
import { IsDateString, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PlantProcess {
  @IsEnum(ProcessInterval)
  interval: ProcessInterval;
  @IsDateString()
  lastTimeProcessed: Date;
  @IsDateString()
  nextTimeProcessed: Date;
}

export class PlantDto {
  @IsString()
  name: string;
  @IsString()
  notes: string;
  @IsString()
  place: string;
  @ValidateNested()
  @Type(() => PlantProcess)
  watering: PlantProcess;
  @ValidateNested()
  @Type(() => PlantProcess)
  spraing: PlantProcess;
  @ValidateNested()
  @Type(() => PlantProcess)
  feeding: PlantProcess;
}




