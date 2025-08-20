import { Struct, VarUInt, UInt64, UInt8, Checksum256 } from "@wharfkit/antelope"
import BN from "bn.js";

@Struct.type('code_hash')
export class CodeHashResult extends Struct {
    @Struct.field('varuint32') struct_version!: VarUInt
    @Struct.field('uint64') code_sequence!: UInt64
    @Struct.field('checksum256') code_hash!: Checksum256
    @Struct.field('uint8') vm_type!: UInt8
    @Struct.field('uint8') vm_version!: UInt8

    constructor(data: Partial<CodeHashResult> = {}) {
        super(data)
        this.struct_version = data.struct_version ?? new VarUInt(new BN(0))
        this.code_sequence  = data.code_sequence  ?? new UInt64(new BN(0))
        this.code_hash      = data.code_hash      ?? new Checksum256(new Uint8Array(0))
        this.vm_type        = data.vm_type        ?? new UInt8(new BN(0))
        this.vm_version     = data.vm_version     ?? new UInt8(new BN(0))
    }
}