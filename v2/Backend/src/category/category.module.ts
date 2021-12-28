import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from '../Models/category';
import { CategoryResolver } from './category.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name : 'Category', schema : CategorySchema }] )],
  providers: [CategoryResolver, CategoryService]
})
export class CategoryModule {}
