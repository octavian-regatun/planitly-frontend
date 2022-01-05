namespace React {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      is_current_month?: 'true' | 'false';
    }
  }