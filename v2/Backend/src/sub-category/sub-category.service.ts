import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sub } from '../Models/sub';
import { CreateSub } from './dto/input/create';
import slugify from 'slugify';
import { GetSubArg } from './dto/args/getSub.arg';
import { Category } from '../Models/category';
import { UpdateSub } from './dto/input/update';

@Injectable()
export class SubCategoryService {
  constructor( @InjectModel('Sub') private readonly subModel : Model<Sub>) {}

  async create( createSub : CreateSub ) : Promise<Sub> {
    const newSub = new this.subModel(createSub)
    newSub.slug = slugify(newSub.name)
    return await newSub.save();
  }

  async findAll() : Promise<Sub[]> {
    return await this.subModel
      .find()
      .populate('categoryId', null, 'Category')
      .exec()
  }

  async findOne( getSubArg : GetSubArg ) : Promise<Sub> {
      return await this.subModel.findOne({ slug : getSubArg.slug })
            .populate('categoryId', null, 'Category')
            .exec()
  }

  async removeOne(getSubArg : GetSubArg) : Promise<Sub> {
    return await this.subModel.findOneAndDelete({ slug : getSubArg.slug }).exec();
  }

  async updateOne( updateSub : UpdateSub ) : Promise<Sub> {
    const updated = await this.subModel.findOneAndUpdate(
      { slug : updateSub.slug }, updateSub, {new : true}
      )
    return updated;
  }

}
