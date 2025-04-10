import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { Category } from './category.entity'

@Entity()
export class Todolist {
  @PrimaryColumn({ type: 'uuid' })
  id: string

  @ManyToOne(() => Category, (category) => category.todolist, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category

  @Column({ type: 'uuid', nullable: false })
  categoryId: string

  @Column({ type: 'varchar', length: 255 })
  title: string

  @Column({ type: 'boolean', default: 'false' })
  checked: boolean

  @Column({ type: 'int', default: 0 })
  order: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
