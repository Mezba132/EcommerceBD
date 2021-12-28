import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubCategoryService } from './sub-category.service';
import { Sub } from '../Models/sub';
import { hasRoles } from '../auth/custom-decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateSub } from './dto/input/create';
import { GetSubArg } from './dto/args/getSub.arg';
import { UpdateSub } from './dto/input/update';

@Resolver(() => Sub)
export class SubCategoryResolver {
  constructor( private subCategoryService : SubCategoryService) {}

  @Mutation(() => Sub)
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  createSubCat(@Args('createSub') createSub : CreateSub ) : Promise<Sub> {
    return this.subCategoryService.create(createSub)
  }

  @Query(() => [Sub])
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findSubCats() : Promise<Sub[]> {
    return this.subCategoryService.findAll();
  }

  @Query( () => Sub )
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findSubCat(@Args() getSubArg : GetSubArg) : Promise<Sub> {
    return await this.subCategoryService.findOne(getSubArg)
  }

  @Query( () => Sub )
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteSubCat(@Args() getSubArg : GetSubArg) : Promise<Sub> {
    return await this.subCategoryService.removeOne(getSubArg)
  }

  @Mutation(() => Sub)
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateSubCat(@Args('updateSub') updateSub : UpdateSub) : Promise<Sub> {
    return this.subCategoryService.updateOne(updateSub)
  }

}
