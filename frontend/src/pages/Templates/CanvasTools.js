import React from 'react'
import '@flaticon/flaticon-uicons/css/all/all.css';

const CanvasTools = () => {
    return (
        <div>
            <div className='flex flex-wrap'>
                <div className='p-2'>
                    <div className='bg-orange-800 p-2 rounded-md'>
                        <a href="/" title="Home" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <i class="fi fi-sr-home" title='Home' style={{ fontSize: '24px', color: 'wheat' }}></i>
                        </a>
                    </div>

                </div>
                <div className='p-2'>
                    <div className='bg-orange-800 p-2 rounded-md'>
                        <a href="/" title="Add Page" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <i class="fi fi-sr-add-document" title='Add Page' style={{ fontSize: '24px' }}></i>
                        </a>
                    </div>
                </div>
                <div className='p-2'>
                    <div className='bg-orange-800 p-2 rounded-md'>
                        <a href="/" title="Save Page" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <i class="fi fi-sr-disk" title="Save Page" style={{ fontSize: '24px' }}></i>
                        </a>
                    </div>
                </div>
                <div className='p-2'>
                    <div className='bg-orange-800 p-2 rounded-md'>
                        <a href="/" title="Delete" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <i class="fi fi-bs-trash" title="Delete" style={{ fontSize: '24px' }}></i>
                        </a>
                    </div>
                </div>
                <div className='p-2'>
                    <div className='bg-orange-800 p-2 rounded-md'>
                        <a href="/" title="export" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <i class="fi fi-sr-file-export" title="export" style={{ fontSize: '24px' }}></i>
                        </a>
                    </div>
                </div>
                <div className='w-96 p-2 justify-items-stretch '>
                    <div className='bg-orange-600 p-2 text-center rounded-md'>
                        <a href="/" title="Delete" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span>Epaper 1</span>
                        </a>
                    </div>
                </div>
                <div className='p-2'>
                    <div className='bg-orange-800 p-2 rounded-md'>
                        <a href="/" title="text" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <i class="fi fi-sr-message-text" title="text" style={{ fontSize: '24px' }}></i>
                        </a>
                    </div>
                </div>
                <div className='p-2'>
                    <div className='bg-orange-800 p-2 rounded-md'>
                        <a href="/" title="add image" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <i class="fi fi-br-add-image" title="add image" style={{ fontSize: '24px' }}></i>
                        </a>
                    </div>
                </div>
                <div className='p-2'>
                    <div className='bg-orange-800 p-2 rounded-md'>
                        <a href="/" title="preview" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <i class="fi fi-sr-overview" title="preview" style={{ fontSize: '24px' }}></i>
                        </a>
                    </div>
                </div>
                <div className='p-2'>
                    <div className='bg-orange-800 p-2 rounded-md'>
                        <a href="/" title="frame" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <i class="fi fi-br-frame" title="preview" style={{ fontSize: '24px' }}></i>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CanvasTools
