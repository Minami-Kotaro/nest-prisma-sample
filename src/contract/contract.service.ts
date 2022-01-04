import { Injectable } from '@nestjs/common';
import { m_contracts, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { ReadContractDto } from './dto/read-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractService {
  constructor(private prisma: PrismaService) {}

  async create(createContractDto: CreateContractDto): Promise<m_contracts> {
    const now = new Date();
    const data: Prisma.m_contractsCreateInput = {
      contract_id: 2,
      contractor_name: createContractDto.contractorName,
      m_contract_managers: {
        connect: { contract_manager_id: createContractDto.contractManagerId },
      },
      m_users: { connect: { user_id: createContractDto.userId } },
      renewal_count: 1,
      sales_staff_name: createContractDto.salesStaffName,
      contract_date: new Date(createContractDto.contractDate),
      valid_start_date: new Date(createContractDto.validStartDate),
      valid_end_date: new Date(createContractDto.validEndDate),
      is_deleted: false,
      create_date: now,
      update_date: now,
    };
    return this.prisma.m_contracts.create({
      data,
    });
  }

  async findAll(): Promise<ReadContractDto[]> {
    const data = await this.prisma.m_contracts.findMany({
      include: {
        m_contract_managers: true,
        m_users: true,
      },
    });

    return data.map((x) => {
      const contracts = new ReadContractDto();
      contracts.contractId = x.contract_id;
      contracts.contractorName = x.contractor_name;
      contracts.contractManagerName =
        x.m_contract_managers.contract_manager_name;
      contracts.contractManagerMailAddress =
        x.m_contract_managers.contract_manager_mail_address;
      contracts.userName = x.m_users.user_name;
      contracts.userMailAddress = x.m_users.user_mail_address;
      contracts.renewalCount = x.renewal_count;
      contracts.salesStaffName = x.sales_staff_name;
      contracts.contractDate = x.contract_date;
      contracts.validStartDate = x.valid_start_date;
      contracts.validEndDate = x.valid_end_date;
      contracts.isDeleted = x.is_deleted;
      return contracts;
    });
  }

  async findOne(id: number): Promise<ReadContractDto> {
    const contractWhereUniqueInput: Prisma.m_contractsWhereUniqueInput = {
      contract_id: id,
    };
    const data = await this.prisma.m_contracts.findUnique({
      where: contractWhereUniqueInput,
      include: {
        m_contract_managers: true,
        m_users: true,
      },
    });

    const contracts = new ReadContractDto();
    contracts.contractId = data.contract_id;
    contracts.contractorName = data.contractor_name;
    contracts.contractManagerName =
      data.m_contract_managers.contract_manager_name;
    contracts.contractManagerMailAddress =
      data.m_contract_managers.contract_manager_mail_address;
    contracts.userName = data.m_users.user_name;
    contracts.userMailAddress = data.m_users.user_mail_address;
    contracts.renewalCount = data.renewal_count;
    contracts.salesStaffName = data.sales_staff_name;
    contracts.contractDate = data.contract_date;
    contracts.validStartDate = data.valid_start_date;
    contracts.validEndDate = data.valid_end_date;
    contracts.isDeleted = data.is_deleted;

    return contracts;
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    const now = new Date();
    const where: Prisma.m_contractsWhereUniqueInput = { contract_id: id };
    const data: Prisma.m_contractsUpdateInput = {
      contractor_name: updateContractDto.contractorName,
      m_contract_managers: {
        connect: { contract_manager_id: updateContractDto.contractManagerId },
      },
      m_users: { connect: { user_id: updateContractDto.userId } },
      sales_staff_name: updateContractDto.salesStaffName,
      contract_date: updateContractDto.contractDate,
      valid_start_date: updateContractDto.validStartDate,
      valid_end_date: updateContractDto.validEndDate,
      update_date: now,
    };

    return this.prisma.m_contracts.update({
      data,
      where,
    });
  }

  async remove(id: number) {
    const now = new Date();
    const where: Prisma.m_contractsWhereUniqueInput = { contract_id: id };
    const data: Prisma.m_contractsUpdateInput = {
      is_deleted: true,
      update_date: now,
    };
    return this.prisma.m_contracts.update({
      data,
      where,
    });
  }
}
