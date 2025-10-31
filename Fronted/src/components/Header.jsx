import { useNavigate } from 'react-router-dom';

function Header({ showSearch = true }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b-4 border-primary mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-4 md:py-5 gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer text-black bg-transparent border-0 p-0"
          aria-label="Go to homepage"
        >
          {/* Logo image - place your provided logo at public/logo.png */}
          <img src="https://imgs.search.brave.com/w30pLGTciBymWjEjOi9-CtJY6lhiexusWvs8NgjMliM/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Z0Y2RuLm5l/dC9pbWFnZXMvdF9h/cHAtaWNvbi1zL3Av/OWNjMGI2YzQtOTQ0/ZC00Y2Y2LWI3NzUt/NDY2ZDFhOGMzNTAx/LzI5NDc4NjUzOTYv/aGlnaHdheS1kZWxp/dGUtbG9nbw" alt="Highway Delite logo" className="h-10 w-auto object-contain" />
          <span className="text-lg md:text-xl font-bold leading-tight lowercase tracking-tight ml-1">
            highway<br/>delite
          </span>
        </button>
        
        {showSearch && (
          <div className="flex items-center gap-2 w-full md:flex-1 md:max-w-2xl md:mx-10">
            <input 
              type="text" 
              placeholder="Search destinations" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded text-sm text-black focus:outline-none focus:border-primary"
            />

            <button className="px-6 py-3 bg-primary hover:bg-primary-hover rounded font-semibold text-black transition-colors">
              Search
            </button>
          </div>
        )}
        
        {/* <div className="text-sm text-black hidden md:block">
          Kayak
        </div> */}
      </div>
    </div>
  );
}

export default Header;

