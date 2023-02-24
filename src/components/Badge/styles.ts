import styled from 'styled-components'

type SpanProps = {
  color: string
  margin: string
}

export const Span = styled.span`
  align-items: center;
  background-color: ${(props: SpanProps) => `var(--message-${props.color})`};
  border-radius: 1rem;
  color: ${(props: SpanProps) =>
    props.color === 'primary' ? '#fff' : 'var(--message-color-secondary)'};
  display: inline-flex;
  font-size: 80%;
  font-weight: bold;
  justify-content: center;
  line-height: 1;
  ${(props: SpanProps) => `margin-${props.margin}`}: 0.5rem;
  padding: 0.25rem 0.5rem 0.38rem;
`
