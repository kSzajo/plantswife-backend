import { ProcessInterval } from './processInterval.enum';
import { IsDateString, IsDefined, IsEnum, IsString, ValidateNested } from 'class-validator';
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
  @IsDefined()
  watering: PlantProcess;
  @ValidateNested()
  @Type(() => PlantProcess)
  @IsDefined()
  spraing: PlantProcess;
  @ValidateNested()
  @Type(() => PlantProcess)
  @IsDefined()
  feeding: PlantProcess;
  imageUrl?: string;
}




