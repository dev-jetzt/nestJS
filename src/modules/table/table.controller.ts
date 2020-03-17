import { Controller, Get } from '@nestjs/common';
import { TableEntryDto } from './table.dto';
import { TableService } from './table.service';

@Controller('/api')
export class TableController {

    constructor(private readonly tableService: TableService) {}

    @Get('/table')
    public async getTable(): Promise<TableEntryDto[]> {
        return this.tableService.calculateAndReturnTable();
    }

}