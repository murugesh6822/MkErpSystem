const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = 'btn';
  const classes = `${base} btn-${variant} ${className}`.trim();
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
