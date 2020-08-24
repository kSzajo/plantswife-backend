export class CreatePlantDto {
  name: string
  notes: string
  place: string
  watering: PlantProcess
  spraing: PlantProcess
  feeding: PlantProcess
}



export class PlantProcess {
  interval: string
  lastTimeProcessed: string
}



