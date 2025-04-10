import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { Todolist } from './todolist.entity'

@Entity()
export class Category {
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @Column({ type: 'varchar', length: 255 })
  title: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @OneToMany(() => Todolist, (todolist) => todolist.category, {
    cascade: true
  })
  todolist: Todolist[]

  @Column({ type: 'boolean', default: 'false' })
  deleted: boolean
}
