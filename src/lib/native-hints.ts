import { NativeType, nativeTypeCollection } from './type-matcher';

const setParamLength = (name: string, len: string | number) => ({
    params: {
        [name]: { len }
    }
});

const replaceParamWithLocal = (name: string, localName: string, glCallString: string = localName) => ({
    params: {
        [name]: {
            replaceWithLocal: localName,
            glCallString
        }
    }
});

const addLengthParam = (name: string, lengthName: string = 'length') => ({
    params: {
        [name]: {
            len: lengthName
        }
    },
    syntheticParams: [{
        name: lengthName,
        type: nativeTypeCollection.get('GLuint')
    }]
});

export interface NativeHintsCommand {
    params?: {
        [paramName: string]: {
            isOutType?: boolean;
            len?: number | string;
            replaceWithLocal?: string;
            glCallString?: string;
            type?: NativeType;
        }
    },
    syntheticParams?: {
        name: string,
        type: NativeType
    }[]
}

export const nativeHintsCommands: { [commandName: string]: NativeHintsCommand } = {
    // needs additional parameter for determining array-size
    glGetTexParameterfv: addLengthParam('params'),
    glGetTexParameteriv: addLengthParam('params'),
    glGetShaderiv: addLengthParam('params'),
    glGetRenderbufferParameteriv: addLengthParam('params'),
    glGetProgramiv: addLengthParam('params'),
    glGetBufferParameteriv: addLengthParam('params'),
    glGetUniformiv: addLengthParam('params'),
    glGetUniformfv: addLengthParam('params'),
    glGetBooleanv: addLengthParam('data'),
    glGetDoublev: addLengthParam('data'),
    glGetFloatv: addLengthParam('data'),
    glGetIntegerv: addLengthParam('data'),
    glGetFramebufferAttachmentParameteriv: addLengthParam('params'),

    glUniform1fv: replaceParamWithLocal('count', 'length_value'),
    glUniform1iv: replaceParamWithLocal('count', 'length_value'),
    glUniform2fv: replaceParamWithLocal('count', 'length_value'),
    glUniform2iv: replaceParamWithLocal('count', 'length_value'),
    glUniform3iv: replaceParamWithLocal('count', 'length_value'),
    glUniform3fv: replaceParamWithLocal('count', 'length_value'),
    glUniform4iv: replaceParamWithLocal('count', 'length_value'),
    glUniform4fv: replaceParamWithLocal('count', 'length_value'),
    glUniformMatrix2fv: replaceParamWithLocal('count', 'length_value', 'length_value  / 4'),
    glUniformMatrix3fv: replaceParamWithLocal('count', 'length_value', 'length_value  / 9'),
    glUniformMatrix4fv: replaceParamWithLocal('count', 'length_value', 'length_value  / 16'),
    glDeleteBuffers: replaceParamWithLocal('n', 'length_buffers'),
    glDeleteFramebuffers: replaceParamWithLocal('n', 'length_framebuffers'),
    glDeleteRenderbuffers: replaceParamWithLocal('n', 'length_renderbuffers'),
    glDeleteTextures: replaceParamWithLocal('n', 'length_textures'),
    glBufferData: replaceParamWithLocal('size', 'byteLength_data'),
    glBufferSubData: replaceParamWithLocal('size', 'byteLength_data'),
    glCompressedTexImage2D: replaceParamWithLocal('imageSize', 'byteLength_data'),
    glCompressedTexSubImage2D: replaceParamWithLocal('imageSize', 'byteLength_data'),

    glShaderBinary: {
        params: {
            count: {
                replaceWithLocal: 'length_shaders'
            },
            length: {
                replaceWithLocal: 'byteLength_binary'
            }
        }
    },

    glDrawElements: {
        params: {
            indices: {
                type: nativeTypeCollection.get('const GLint *')
            }
        }
    },
    glVertexAttribPointer: {
        params: {
            pointer: {
                type: nativeTypeCollection.get('GLint'),
            }
        }
    }
};
