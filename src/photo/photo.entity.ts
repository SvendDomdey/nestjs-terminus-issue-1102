import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Photo {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ length: 500 })
  name: string;
}
