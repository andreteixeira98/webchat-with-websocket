import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('settings')
class Settings {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    userName: string;

    @Column()
    chat: boolean;


    @CreateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Settings };