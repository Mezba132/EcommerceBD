import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category } from '../Models/category';
import { CreateCategory } from './dto/input/create.input';
import { InjectModel } from '@nestjs/mongoose';
import slugify from 'slugify';
import { getCategoryArg } from './dto/args/getCategory.arg';
import { UpdateCategory } from './dto/input/update.input';

@Injectable()
export class CategoryService {

      constructor( @InjectModel('Category') private readonly categoryModel : Model<Category> ) {}

      async create( createCat : CreateCategory ) : Promise<Category> {
        const newCat = new this.categoryModel(createCat)
        newCat.slug = slugify(newCat.name)
        return await newCat.save();
      }

      async getCategories( ) : Promise<Category[]> {
        return await this.categoryModel.find().exec()
      }

      async getCategory( getCategory : getCategoryArg ) : Promise<Category> {
        return await this.categoryModel.findOne({ slug : getCategory.slug }).exec()
      }

      async deleteCategory( getCategory : getCategoryArg ) : Promise<Category> {
        return await this.categoryModel.findOneAndDelete({ slug : getCategory.slug }).exec()
      }

      async updateCategory( updateCategory : UpdateCategory ) : Promise<Category> {
        const cat = await this.categoryModel.findOne({ slug : updateCategory.slug }).exec()
        cat.name = updateCategory.name
        cat.slug = slugify(updateCategory.name)
        return cat.save();
      }

}
