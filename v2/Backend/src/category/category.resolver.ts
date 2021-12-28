import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from '../Models/category';
import { CategoryService } from './category.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCategory } from './dto/input/create.input';
import { hasRoles } from '../auth/custom-decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { getCategoryArg } from './dto/args/getCategory.arg';
import { UpdateCategory } from './dto/input/update.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor( private readonly categoryService : CategoryService) {}

  @Mutation(() => Category)
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  createCategory(@Args('createCat') createCat : CreateCategory) : Promise<Category> {
    return this.categoryService.create(createCat)
  }

  @Query( () => [Category] )
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findCategories() : Promise<Category[]> {
    return this.categoryService.getCategories()
  }

  @Query( () => Category )
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findCategory(@Args() getCategory : getCategoryArg) : Promise<Category> {
    return this.categoryService.getCategory(getCategory)
  }

  @Mutation(() => Category)
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateCategory(@Args('updateCategory') updateCategory : UpdateCategory) : Promise<Category> {
    return this.categoryService.updateCategory(updateCategory)
  }

  @Query( () => Category )
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteCategory(@Args() getCategory : getCategoryArg) : Promise<Category> {
    return this.categoryService.deleteCategory(getCategory)
  }

}

