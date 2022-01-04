export class ReadContractDto {
  contractId: number;
  contractorName: string;
  contractManagerName: string;
  contractManagerMailAddress: string;
  userName: string;
  userMailAddress: string;
  renewalCount: number;
  salesStaffName: string;
  contractDate: Date;
  validStartDate: Date;
  validEndDate: Date;
  isDeleted: boolean;
}
