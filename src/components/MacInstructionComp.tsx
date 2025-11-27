import React, { useState } from 'react';

interface MacInstructionCompProps {
  isArm64?: boolean;
}

function genPdfSrc(isArm64: boolean) {
  const option = "#toolbar=0&navpanes=0&scrollbar=0";
  if (isArm64) {
    return "/instruction/arm/instruction.pdf" + option;
  }
  return "/instruction/intel/instruction.pdf" + option;
}

export default function MacInstructionComp({ isArm64 = false }: MacInstructionCompProps) {
  const [pdfError, setPdfError] = useState(false);
  const pdfSrc = genPdfSrc(isArm64);

  return (
    <div 
      style={{
        backgroundColor: '#ffd4d4',
        border: '1px solid #ff9999',
        borderRadius: '12px',
        padding: '32px',
        margin: '24px 0',
        color: '#5a1a1a',
        fontSize: '15px',
        lineHeight: '1.6'
      }}
    >
      <h4 style={{
        color: '#8b0000',
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <i className="bi bi-apple" style={{ fontSize: '24px' }} />
        For MacOS you will need to follow these steps to run the downloaded <strong>Open Worship app</strong>.
      </h4>
      <p style={{ 
        fontSize: '16px', 
        fontWeight: '600',
        color: '#8b0000',
        marginBottom: '20px'
      }}>
        If you do not follow these steps, the app will not run properly, and you will not be able to use the app.
        <br />
        <strong>Do not skip any steps!</strong>
      </p>

      <div style={{
        display: 'flex',
        gap: '24px',
        marginTop: '24px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
          <ol style={{
            paddingLeft: '24px',
            margin: 0
          }}>
            <li style={{ marginBottom: '16px' }}>
              <p style={{ margin: '4px 0' }}>
                Download <strong>Open Worship app</strong>
              </p>
            </li>
            <li style={{ marginBottom: '16px' }}>
              <p style={{ margin: '4px 0' }}>
                Open the downloaded file and drag the <strong>Open Worship app</strong> to your Applications folder
              </p>
            </li>
            <li style={{ marginBottom: '16px' }}>
              <p style={{ margin: '4px 0' }}>
                In your Applications folder, open the <strong>Utilities</strong> folder and run the <strong>Terminal</strong> app
              </p>
            </li>
            <li style={{ marginBottom: '16px' }}>
              <p style={{ margin: '4px 0' }}>In the Terminal app, type the following:</p>
              <pre style={{
                backgroundColor: '#ffffff',
                border: '2px solid #cc0000',
                borderRadius: '6px',
                padding: '12px',
                margin: '8px 0',
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#000000',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word'
              }}>
xattr -dr com.apple.quarantine "/Applications/Open Worship app.app"
              </pre>
              <p style={{ margin: '8px 0 4px 0' }}>
                If you are on an <strong>Apple Silicon Mac (M1/M2/...)</strong>, you may need to run this command too:
              </p>
              <pre style={{
                backgroundColor: '#ffffff',
                border: '2px solid #cc0000',
                borderRadius: '6px',
                padding: '12px',
                margin: '8px 0',
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#000000',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word'
              }}>
xattr -cr "/Applications/Open Worship app.app"
              </pre>
            </li>
            <li style={{ marginBottom: '16px' }}>
              <p style={{ margin: '4px 0' }}>
                Now <strong>Open Worship app</strong> should open correctly.
              </p>
            </li>
          </ol>
        </div>

        <div 
          style={{
            flex: '1 1 400px',
            minWidth: '300px',
            border: '2px solid #cc0000',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Action buttons at top */}
          <div style={{
            padding: '16px',
            backgroundColor: '#8b0000',
            textAlign: 'center',
            borderBottom: '2px solid #cc0000'
          }}>
            <button
              onClick={() => window.open(pdfSrc, '_blank', 'noopener,noreferrer')}
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
              }}
            >
              <i className="bi bi-file-earmark-pdf" />
              Open in PDF Viewer
            </button>
          </div>

          {/* PDF viewer with fallbacks */}
          <div style={{ flex: 1, position: 'relative', minHeight: '500px' }}>
            {!pdfError ? (
              <iframe
                src={pdfSrc}
                width="100%"
                height="100%"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                title="PDF Instruction Viewer"
                onError={() => setPdfError(true)}
              />
            ) : (
              <div style={{
                padding: '40px',
                textAlign: 'center',
                color: '#8b0000'
              }}>
                <i className="bi bi-file-earmark-pdf" style={{ fontSize: '48px', marginBottom: '16px' }} />
                <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  PDF viewer not available in your browser
                </p>
                <p style={{ marginBottom: '24px' }}>
                  Please use the button above to view the instructions.
                </p>
                <button
                  onClick={() => window.open(pdfSrc, '_blank', 'noopener,noreferrer')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    backgroundColor: 'rgba(139, 0, 0, 0.1)',
                    color: '#8b0000',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    border: '2px solid #8b0000',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#8b0000';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 0, 0, 0.1)';
                    e.currentTarget.style.color = '#8b0000';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="bi bi-file-earmark-pdf" />
                  Open in PDF Viewer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
