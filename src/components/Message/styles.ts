import styled from 'styled-components'

export type InnerProps = {
  ours?: boolean
}

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  flex-direction: column;
  padding: 0 1rem;
  width: 100%;

  &.theirs {
    &:not(.private) {
      &:nth-of-type(even) {
        & > div {
          background-color: var(--message-secondary-dark);
        }
      }
    }

    .username {
      border-bottom: 1px solid transparent;
      cursor: pointer;
      transition: border-bottom-color 250ms ease;

      &:hover {
        border-bottom-color: var(--message-color-secondary);
      }
    }
  }

  &.private {
    opacity: 0.5;
  }

  .youtube-embed {
    overflow: hidden;
    margin: 0.75rem 0 0.5rem;
  }
`

export const Inner = styled.div`
  animation: 350ms message-appear forwards;
  background-color: var(--user-input-background);
  border-radius: 0.25rem;
  display: inline-block;
  max-width: 75%;
  padding: 0.75rem 1rem;
  box-shadow: 0 0.125rem 0.25rem rgb(0, 0, 0, 0.125);
  text-align: ${(props: InnerProps) => (props.ours ? 'right' : 'left')};
  transition: outline 350ms ease;
  align-self: ${(props: InnerProps) => (props.ours ? 'flex-end' : 'flex-start')};
  ${(props: InnerProps) => (props.ours ? 'border-top-right-radius' : 'border-top-left-radius')}: 0;
  color: ${(props: InnerProps) =>
    props.ours ? 'var(--message-color-primary)' : '--message-color-secondary'};

  &:focus {
    outline: none;
  }

  &::before {
    border-color: ${(props: InnerProps) =>
      props.ours
        ? 'var(--message-primary) transparent transparent transparent'
        : 'transparent var(--message-secondary) transparent transparent'};
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    position: absolute;
    top: 0;
  }

  .theirs & {
    background-color: var(--message-secondary);

    &::before {
      border-color: transparent var(--message-secondary) transparent transparent;
      border-width: 0 0.5rem 0.5rem 0;
      left: -0.5rem;
    }
  }

  .ours & {
    background-color: var(--message-primary);

    &::before {
      border-color: var(--message-primary) transparent transparent transparent;
      border-width: 0.5rem 0.5rem 0 0;
      right: -0.5rem;
    }
  }

  & > span {
    font-size: 110%;
    margin-bottom: 1rem;
    display: block;
  }

  time {
    display: block;
    font-size: 80%;
  }

  @keyframes message-appear {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const UserName = styled.div`
  font-size: 1rem;
`

export const MentionedUser = styled.span`
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 0.25rem;
  color: var(--message-color-secondary);
  cursor: pointer;
  display: inline-block;
  padding: 0 0.25rem 0.125rem;
  transition: background-color 250ms ease;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }

  & > span {
    opacity: 0.5;
  }
`
