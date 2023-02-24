import styled from 'styled-components'

export const InputContainer = styled.div`
  align-items: center;
  background-color: var(--user-input-background);
  border-top: 1px solid #fafafa;
  display: flex;
  height: 64px;
  padding: 0 1rem;
`

export const Input = styled.input`
  appearance: none;
  background-color: #fff;
  border-radius: 0.25rem;
  border: 0;
  border: 1px solid #d4d4d4;
  color: var(--message-color-secondary);
  display: block;
  font-family: inherit;
  font-size: 1rem;
  height: auto;
  line-height: 1.5;
  padding: 0.5rem;
  resize: none;
  width: 100%;

  &::placeholder {
    color: var(--message-color-secondary);
  }

  &:focus {
    outline: none;
  }
`
