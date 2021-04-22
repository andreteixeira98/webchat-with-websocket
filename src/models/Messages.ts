import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Users } from './Users';

@Entity('messages')
class Messages {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    admin_id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Messages };