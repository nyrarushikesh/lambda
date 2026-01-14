import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

async function build() {
  try {
    // Clean dist directory
    const distDir = path.join(__dirname, 'dist');
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true });
    }
    fs.mkdirSync(distDir, { recursive: true });

    console.log('Building Lambda function...');

    // Build with esbuild
    await esbuild.build({
      entryPoints: ['src/handler.ts'],
      bundle: true,
      minify: true,
      sourcemap: true,
      platform: 'node',
      target: 'node20',
      outfile: 'dist/index.js',
      external: ['aws-sdk'],
      format: 'cjs',
      metafile: true,
    });

    console.log('✓ Build completed successfully');
    console.log('✓ Output: dist/index.js');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
