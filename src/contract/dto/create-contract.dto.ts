import { IsDateString, IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  contractorName: string;
  @IsNotEmpty()
  @IsInt()
  contractManagerId: number;
  @IsNotEmpty()
  @IsInt()
  userId: number;
  @IsNotEmpty()
  salesStaffName: string;
  @IsNotEmpty()
  @IsDateString()
  contractDate: Date;
  @IsNotEmpty()
  @IsDateString()
  validStartDate: Date;
  @IsNotEmpty()
  @IsDateString()
  validEndDate: Date;
}
