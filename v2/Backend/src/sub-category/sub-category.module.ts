import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryResolver } from './sub-category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { SubSchema } from '../Models/sub';

@Module({
  imports:[MongooseModule.forFeature([{ name : 'Sub', schema: SubSchema }])],
  providers: [SubCategoryResolver,SubCategoryService]
})
export class SubCategoryModule {}
