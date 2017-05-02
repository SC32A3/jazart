
package global.sesoc.jazart.detect;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

/*Sound capture*/
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.TargetDataLine;
import javax.sound.sampled.UnsupportedAudioFileException;

public class WavFileHelper implements Runnable {
	/* Implement analysis here */

	AudioFormat aFormat;
	AudioInputStream ais;

	TargetDataLine line;
	DataLine.Info info;
	PolyphonicPitchDetection mainProgram;
	int bitDepth;
	int bitSelection;
	int stereo;

	/* Constructor */
	public WavFileHelper(int bitDepthIn, PolyphonicPitchDetection mainProgram) {
		bitDepth = bitDepthIn;
		bitSelection = bitDepth / 8;
		this.mainProgram = mainProgram;
		stereo = 1; /* Capture mono */

		try {
			ais = AudioSystem.getAudioInputStream(new File("C:/Users/user/Downloads/voice.wav"));
		} catch (UnsupportedAudioFileException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void run() {
		// aFormat = new AudioFormat(mainProgram.samplingRate, bitDepth, stereo,
		// true, false);
		aFormat = ais.getFormat();
		info = new DataLine.Info(TargetDataLine.class, aFormat);
		System.out.println(info);
		try {
			/*
			 * line = (TargetDataLine) AudioSystem.getLine(info);
			 * line.open(aFormat, line.getBufferSize()); line.start(); // Start
			 * capturing
			 */ int bufferSize = mainProgram.fftWindow * bitSelection * stereo;
			byte buffer[] = new byte[bufferSize];

			int read;
			while ((read = ais.read(buffer)) > 0) {
				if (read > 0) {
					if (bitSelection == 2) {
						short[] data = byteArrayToShortArray(buffer);

						Analysis analysis = new Analysis(data, mainProgram); // FFT
																				// +
																				// klapuri
																				// analysis
						mainProgram.result.add(analysis.klapuri.f0s.get(0));
						System.out.println(analysis.klapuri.f0s.get(0));
					}
				}
			}

			/*
			 * while (mainProgram.continueCapturing) { int count =
			 * line.read(buffer, 0, buffer.length); Blocking call to read //
			 * System.out.println("Got data "+count); if (count > 0) { if
			 * (bitSelection == 1) { //
			 * mainProgram.rawFigure.drawImage(buffer,mainProgram.imWidth,
			 * mainProgram.imHeight);
			 * 
			 * Add pitch detection here for 8 bit, not implemented...
			 * 
			 * } if (bitSelection == 2) { short[] data =
			 * byteArrayToShortArray(buffer);
			 * 
			 * Analysis analysis = new Analysis(data, mainProgram); // FFT // +
			 * // klapuri // analysis
			 * mainProgram.result.add(analysis.klapuri.f0s.get(0));
			 * System.out.println(analysis.klapuri.f0s.get(0)); } } }
			 * line.stop(); line.flush(); line.close();
			 */

			try {
				FileOutputStream fos = new FileOutputStream(new File("C:/Users/user/Downloads/result.txt"));
				ObjectOutputStream oos = new ObjectOutputStream(fos);
				oos.writeObject(mainProgram.result);
				oos.flush();
				oos.close();
				fos.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (Exception err) {
			System.err.println("Error: " + err.getMessage());
		}
	}

	public static short[] byteArrayToShortArray(byte[] arrayIn) {
		short[] shortArray = new short[arrayIn.length / 2];
		for (int i = 0; i < shortArray.length; ++i) {
			shortArray[i] = (short) (((((int) arrayIn[2 * i + 1]) & 0XFF) << 8) | (((int) arrayIn[2 * i]) & 0XFF));
		}
		return shortArray;
	}
}
