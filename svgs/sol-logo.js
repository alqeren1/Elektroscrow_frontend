export default function SolSvg() {
    return (
        <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "6px" }}
        >
            <defs>
                {/* Gradient definition */}
                <linearGradient
                    id="linear-gradient"
                    x1="1.76"
                    y1="23.24"
                    x2="23.24"
                    y2="1.76"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#9945ff" />
                    <stop offset="1" stopColor="#14f195" />
                </linearGradient>
            </defs>

            {/* Gray background in the style so we see the shape clearly */}
            <rect width="25" height="25" rx="6" fill="#f9f9f9" />
            {/* Partially transparent gradient over it */}
            <rect width="25" height="25" rx="6" fill="url(#linear-gradient)" fillOpacity="0.57" />

            {/* White path so it’s clearly visible over the gradient */}
            <path
                fill="#fff"
                d="M20.56,16.71l-2.69,2.89c-.06.06-.13.11-.21.15-.08.03-.16.05-.25.05H4.67
           c-.06,0-.12-.02-.17-.05-.05-.03-.09-.08-.12-.14-.02-.06-.03-.12-.02-.18.01-.06.04-.12.08-.16
           l2.69-2.89c.06-.06.13-.11.21-.15.08-.03.16-.05.25-.05h12.74c.06,0,.12.02.17.05.05.03.09.08.12.14
           .02.06.03.12.02.18-.01.06-.04.12-.08.16ZM17.87,10.89c-.06-.06-.13-.11-.21-.15-.08-.03-.16-.05-.25-.05H4.67
           c-.06,0-.12.02-.17.05-.05.03-.09.08-.12.14-.02.06-.03.12-.02.18.01.06.04.12.08.16l2.69,2.89
           c.06.06.13.11.21.15.08.03.16.05.25.05h12.74c.06,0,.12-.02.17-.05.05-.03.09-.08.12-.14.02-.06.03-.12.02-.18
           -.01-.06-.04-.12-.08-.16l-2.69-2.89ZM4.67,8.82h12.74c.09,0,.17-.02.25-.05.08-.03.15-.08.21-.15
           l2.69-2.89s.07-.1.08-.16c.01-.06,0-.12-.02-.18-.02-.06-.06-.1-.12-.14-.05-.03-.11-.05-.17-.05H7.59
           c-.09,0-.17.02-.25.05-.08.03-.15.08-.21.15l-2.69,2.89s-.07.1-.08.16c-.01.06,0,.12.02.18.02.06.06.1.11.14
           .05.03.11.05.17.05Z"
            />
        </svg>
    )
}
