import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { EnderecoService } from './endereco.service';

@Controller('enderecos')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
  create(@Body() data: CreateEnderecoDto) {
    return this.enderecoService.create(data);
  }

  @Get()
  findAll() {
    return this.enderecoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enderecoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateEnderecoDto) {
    return this.enderecoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enderecoService.remove(id);
  }
}
