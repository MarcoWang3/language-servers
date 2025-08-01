// Port of implementation in AWS Toolkit for VSCode
// https://github.com/aws/aws-toolkit-vscode/blob/9d8ddbd85f4533e539a58e76f7c46883d8e50a79/packages/core/src/codewhisperer/models/model.ts

// TODO: consolidate these strategy ids
export type UtgStrategy = 'ByName' | 'ByContent' | 'NEW_UTG'

export type CrossFileStrategy = 'OpenTabs_BM25'

export type ProjectContextStrategy = 'codemap'

export type RecentEdits = 'recentEdits'

export type SupplementalContextStrategy =
    | CrossFileStrategy
    | ProjectContextStrategy
    | UtgStrategy
    | RecentEdits
    | 'Empty'

export interface CodeWhispererSupplementalContext {
    isUtg: boolean
    isProcessTimeout: boolean
    supplementalContextItems: CodeWhispererSupplementalContextItem[]
    contentsLength: number
    latency: number
    strategy: SupplementalContextStrategy
}

export interface CodeWhispererSupplementalContextItem {
    content: string
    filePath: string
    score?: number
}

/**
 * Represents a snapshot of a document at a specific point in time
 */
export interface DocumentSnapshot {
    /** URI of the document */
    readonly filePath: string
    /** Size of the snapshot content in bytes */
    readonly size: number
    /** Timestamp when the snapshot was taken */
    readonly timestamp: number
    /** Content of the document at the time of snapshot */
    readonly content: string
}

/**
 * Represents a snapshot content of a file at a specific point in time
 */
export interface FileSnapshotContent {
    /** URI of the file */
    readonly filePath: string
    /** Content of the file */
    readonly content: string
    /** Timestamp when the snapshot was taken */
    readonly timestamp: number
}
